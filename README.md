
# devai – AI-Powered Developer CLI

**devai** is a Command Line Interface (CLI) tool that automates Git commit workflows for software developers.

Previously fully offline, **devai** now features a **hybrid architecture**! You can seamlessly switch between a **Local AI model (Ollama)** for privacy-focused offline generation , or a **Global Cloud AI (Google Gemini)** for high-speed, advanced analysis. It analyzes your Git changes and suggests standardized commit messages within seconds.

## 📋 Requirements

To run the tool on your computer, you need:

* **Node.js** (v18 or higher)
* **pnpm** (Package manager)
* 
**Ollama** (Local model runner - *required only for local mode*) 


* 
**Google Gemini API Key** (*required only for global mode*) 



### Download Local Models

If you plan to use the local provider, ensure you have downloaded your preferred Ollama model:

```bash
ollama run gemma3:4b

```

## ⚙️ Environment Variables (.env)

Since the project now supports Google Generative AI, you must create a `.env` file in the root directory of the project.

Create a `.env` file and add the following:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here

```

*Note: Make sure to add `.env` to your `.gitignore` file so you don't accidentally publish your API key!*

## 🚀 Installation

Follow these steps to install the project and register it as a global CLI command:

```bash
# 1. Install dependencies
pnpm install

# 2. Compile the TypeScript code
pnpm exec tsc

# 3. Register the tool as a global command
pnpm link --global

```

After installation, verify it works:

```bash
devai --help

```

## 💻 Usage & Commands

### 1. Generating a Commit Message

During a normal development workflow, stage your files and run the assistant. The tool reads your staged changes (`git diff --cached`) or unstaged changes (`git diff`).

```bash
git add .
devai commit

```

**Output & Confirmation:**
The tool analyzes your changes and suggests a commit message. It then prompts you for confirmation.

```text
 Git değişiklikleri inceleniyor...
 Yapay Zeka düşünülüyor...

 Önerilen Commit Mesajı:
 feat: add local LLM integration and interactive commit

 Bu mesajla commit işlemi yapılsın mı? (Y/n):

```

Press **y** or **Enter**, and the commit will be completed automatically.

### 2. Switching AI Providers

You can dynamically toggle between Local (Ollama) and Global (Gemini) AI providers. By default, the system assumes the global provider is active.

* **Switch to Local Mode (Ollama):**
```bash
devai local

```



*Switches the AI provider to the locally installed model.* 


* **Switch to Global Mode (Google Gemini):**
```bash
devai global

```



*Switches the AI provider to the cloud-based Google Gemini model (Requires `.env` setup).* 



## 📁 Project Structure

```text
devai/
├── src/
│   ├── commands/
│   │   ├── commit.ts               # Analyzes git diff and commits
│   │   └── local-global-changer.ts # Toggles between AI providers
│   ├── llm/
│   │   ├── local-provider.ts       # Ollama integration (gemma3:4b)
│   │   └── cloud-provider.ts       # Gemini integration (gemini-2.5-flash)
│   ├── setup/
│   │   └── geminiapisetup.ts       # Google Generative AI config
│   ├── utils/
│   │   └── git.ts                  # Git diff reader
│   └── index.ts                    # Application entry point & CLI setup
├── .env                            # API Keys (Create this file!)
├── package.json
└── tsconfig.json

```

## 🔧 Configuration (Changing the Model)

**Local Model:**
By default, the local provider is configured to run with `gemma3:4b`. If you want to change the model, open `src/llm/local-provider.ts` and replace the `model` parameter.

**Global Model:**
The cloud provider uses `gemini-2.5-flash`. To change this, edit the model definition in `src/setup/geminiapisetup.ts`.

*Remember to recompile the project (`pnpm exec tsc`) after making code changes.*
