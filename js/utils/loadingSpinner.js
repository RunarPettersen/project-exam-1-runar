export function showLoadingSpinner() {
    const existingSpinner = document.getElementById('loading-spinner');
    if (!existingSpinner) {
        const spinner = document.createElement('div');
        spinner.id = 'loading-spinner';
        spinner.className = 'spinner-overlay';
        spinner.innerHTML = `
            <div class="loader"></div>
        `;
        document.body.appendChild(spinner);
    }
}

export function hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        document.body.removeChild(spinner);
    }
}