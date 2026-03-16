import readline from 'readline';


export const askQuestion = (query: string, isPassword = false): Promise<string> => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Eğer şifre soruluyorsa, ekrana yazılanları yıldızladım
        if (isPassword) {
            console.log('Parola:');

            (rl as any)._writeToOutput = (stringToWrite: string) => {
                // Enter tuşuna basıldığında alt satıra geçmesine izin ver
                if (["\r\n", "\n", "\r"].includes(stringToWrite)) {
                    process.stdout.write(stringToWrite);
                } else {
                    // Diğer tüm harfleri yıldız olarak göster
                    process.stdout.write("*");
                }
            };
        }

        rl.question(query, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};