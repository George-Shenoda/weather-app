export function fetchAPI(url: string) {
    const failedBody = document.querySelector(".failed") as HTMLDivElement;
    const successBody = document.querySelector(".success") as HTMLDivElement;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            failedBody.style.display = "none";
            successBody.style.display = "block";
        })
        .catch(() => {
            successBody.style.display = "none";
            failedBody.style.display = "block";
        });
}
