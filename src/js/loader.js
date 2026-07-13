const loaderSpan = document.querySelector(".loader");

export const showLoader =() =>{
 loaderSpan.classList.remove("visually-hidden")
}
export const hideLoader = () =>{
 loaderSpan.classList.add("visually-hidden")
}