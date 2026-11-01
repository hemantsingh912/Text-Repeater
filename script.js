document.addEventListener('DOMContentLoaded', () => {
    
    const inputText = document.getElementById('inputText');
    const repeatCount = document.getElementById('repeatCount');
    const generateBtn = document.getElementById('generateBtn');
    const errorMessage = document.getElementById('errorMessage');

    const liveCharCount = document.getElementById('liveCharCount');
    const liveLineCount = document.getElementById('liveLineCount');

    const outputSection = document.getElementById('outputSection');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');

    
    inputText.addEventListener('input', () => {
        const text = inputText.value;
        liveCharCount.textContent = text.length;
        liveLineCount.textContent = text ? text.split('\n').length : 0;
        
       
        if (text.trim() !== '') {
            errorMessage.textContent = '';
        }
    });

    
    function validateInputs(text, countVal) {
        if (!text) {
            errorMessage.textContent = 'Error: Please enter some text or paragraph to repeat.';
            return false;
        }

        if (!countVal) {
            errorMessage.textContent = 'Error: Please enter a repeat count.';
            return false;
        }

        const countNum = Number(countVal);

        if (!Number.isInteger(countNum) || countVal.includes('.')) {
            errorMessage.textContent = 'Error: Decimal numbers are not allowed. Enter a whole number.';
            return false;
        }

        if (countNum < 1 || countNum > 1000) {
            errorMessage.textContent = 'Error: Repeat count must be between 1 and 1000.';
            return false;
        }

        errorMessage.textContent = '';
        return true;
    }

   
    generateBtn.addEventListener('click', () => {
        const text = inputText.value;
        const countVal = repeatCount.value.trim();

        if (!validateInputs(text, countVal)) {
            return;
        }

        const count = parseInt(countVal, 10);
        let generatedArray = [];

        for (let i = 0; i < count; i++) {
            generatedArray.push(text);
        }

       
        const finalOutput = generatedArray.join('\n\n');

        
        outputText.textContent = finalOutput;

       
        outputSection.classList.remove('hidden');

        
        outputSection.scrollIntoView({ behavior: 'smooth' });
    });

   
    copyBtn.addEventListener('click', async () => {
        const textToCopy = outputText.textContent;
        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            copyBtn.textContent = '✓ Copied Successfully!';
            copyBtn.style.backgroundColor = '#276749';

            setTimeout(() => {
                copyBtn.textContent = 'Copy Text';
                copyBtn.style.backgroundColor = '';
            }, 2500);
        } catch (err) {
            
            const textAreaElement = document.createElement('textarea');
            textAreaElement.value = textToCopy;
            document.body.appendChild(textAreaElement);
            textAreaElement.select();
            document.execCommand('copy');
            document.body.removeChild(textAreaElement);

            copyBtn.textContent = '✓ Copied Successfully!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Text';
            }, 2500);
        }
    });

    
    downloadBtn.addEventListener('click', () => {
        const textToDownload = outputText.textContent;
        if (!textToDownload) return;

        const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
        const downloadUrl = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'repeated_text_output.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(downloadUrl);
    });

    
    clearBtn.addEventListener('click', () => {
        outputText.textContent = '';
        outputSection.classList.add('hidden');
    });
});