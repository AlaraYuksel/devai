## devai – AI-Powered Developer CLI

**devai** is a Command Line Interface (CLI) tool that automates Git commit workflows for software developers. It is **fully local (offline)** and **privacy-focused**.

Instead of sending your code to cloud-based APIs, it uses a **local AI model (Ollama)** running on your machine to analyze your Git changes and suggest **standardized commit messages (Conventional Commits)** within seconds.

## Requirements

To run the tool on your computer, you need:

* **Node.js** (v18 or higher)
* **pnpm** (Package manager)
* **Ollama** (Local model runner)
* A downloaded **Ollama model**, for example:

  * `qwen2.5-coder:1.5b`
  * `gemma3:4b`

To download a model, run in your terminal:

```
ollama run qwen2.5-coder:1.5b
```
or:

```
ollama run gemma3:4b
```

##  Installation

Follow these steps to install the project and register it as a **global CLI command**:

```
# 1. Install dependencies
pnpm install

# 2. Compile the TypeScript code
pnpm exec tsc

# 3. Register the tool as a global command
pnpm link --global
```

After installation, verify it works:

```
devai --help
```

## Usage

During a normal development workflow:

### 1. Make code changes and stage files

```
git add .
```

### 2. Run the assistant

```
devai commit
```

### 3. Output & Confirmation

The tool analyzes your changes and suggests a commit message:

```
Analyzing Git changes...
AI is thinking...

Suggested Commit Message:
---------------------------
feat: add local LLM integration and interactive commit
---------------------------

Proceed with this commit message? (Y/n):
```

Press **`y` + Enter** and the commit will be completed automatically.


## Project Structure
```
devai/
├── src/
│   ├── commands/       # CLI commands (commit, etc.)
│   ├── llm/            # AI providers (Local provider)
│   ├── utils/          # Utility services (Git diff reader, etc.)
│   └── index.ts        # Application entry point and CLI configuration
├── package.json
└── tsconfig.json
```
## Configuration (Changing the Model)

By default, the tool is configured to run with a **lightweight and fast model** such as gemma3:4b
If you want to change the model:

1. Open the file:
src/llm/local-provider.ts

2. Replace the model name with any **Ollama model** you prefer.

3. Recompile the project:
pnpm exec tsc
