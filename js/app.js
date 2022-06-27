// select elements & assign them to variables
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const spinner = document.getElementById("spinner");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("keypress", (events) => {
  // If the user presses the "Enter" key on the keyboard
  if (events.key === "Enter") {
    // Cancel the default action, if needed
    spinner.classList.remove("hidden");
    spinner.classList.add("flex");

    const searchText = searchField.value;

    // clear
    searchField.value = "";
    bookContainer.textContent = "";
    resultDiv.innerHTML = "";
    // get data
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));

    // functions
    const setBooks = (books) => {
      // result found
      const result = books.numFound;

      const setResult = document.createElement("div");

      // error handling
      if (searchText === "") {
        setResult.innerHTML = `
            <div class="py-6 bg-yellow-300 rounded">
                <h1 class="text-center tracking-wider text-2xl">Input field can not be empty</h1>
            </div>
            `;
        resultDiv.appendChild(setResult);
      } else if (books.numFound === 0) {
        setResult.innerHTML = `
            <div class="py-6 bg-red-500 rounded">
                <h1 class="text-center tracking-wider text-2xl">Invalid keyword</h1>
            </div>
            `;
        resultDiv.appendChild(setResult);
      } else {
        setResult.innerHTML = `
        <div class="px-8 py-4 text-center bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span class="flex text-lg rounded-full bg-indigo-500 uppercase px-2 py-1 font-medium mr-3">${result}</span>
            <span class="font-medium text-lg mr-2 text-left flex-auto">results found</span>
            <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
        </div>
        `;
        resultDiv.appendChild(setResult);
      }

      // slice for 24 items
      const bookSlice = books.docs.slice(0, 24);
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      bookSlice.forEach((book) => {
        // missing cover image condition
        const imgUrl = () => {
          if (book.cover_i) {
            return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
          } else {
            return `https://i.ibb.co/tP4nsSW/cover-Not-Available.png`;
          }
        };

        // conditions for checking the properties
        const authorName = !book.author_name
          ? "Author Name Is Not Given"
          : book.author_name[0];
        const publishYear = !book.first_publish_year
          ? "Publish year Is Not Given"
          : book.first_publish_year;
        const publisher = !book.publisher
          ? "Publish year Is Not Given"
          : book.publisher[0];
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("shadow-xl", "rounded", "bg-white", "p-6");

        // Book Container
        bookDiv.innerHTML = `
            <img class="w-full h-80 mb-4" src=${imgUrl()}>
            <h1 class="text-2xl mb-2 font-medium">${book.title.slice(
              0,
              15
            )}</h1>
            <h2 class="text-lg mb-2"><span class="text-gray-700 font-semibold">Author :<span> <span class="text-gray-600 text-lg">${authorName}</span></h2>
            <h2 class="text-lg mb-2"><span class="text-gray-700 font-semibold">Publisher :<span> <span class="text-gray-600 text-lg">${publisher}</span></h2>
            <h2 class="text-lg"><span class="text-gray-700 font-semibold">First PublishYear :</span> <span class="text-gray-600 text-lg">${publishYear}</span></h2>
            `;
        bookContainer.appendChild(bookDiv);
      });
    };
    events.preventDefault();
    // Trigger the button element with a click
    searchBtn.click();
  }
});

// Handling Event
// searchBtn.addEventListener("click", () => {
//   spinner.classList.remove("hidden");
//   spinner.classList.add("flex");

//   const searchText = searchField.value;

//   // clear
//   searchField.value = "";
//   bookContainer.textContent = "";
//   resultDiv.innerHTML = "";
//   // get data
//   fetch(`http://openlibrary.org/search.json?q=${searchText}`)
//     .then((res) => res.json())
//     .then((data) => setBooks(data));

//   // functions
//   const setBooks = (books) => {
//     // result found
//     const result = books.numFound;

//     const setResult = document.createElement("div");

//     // error handling
//     if (searchText === "") {
//       setResult.innerHTML = `
//             <div class="py-6 bg-yellow-300 rounded">
//                 <h1 class="text-center tracking-wider text-2xl">Input field can not be empty</h1>
//             </div>
//             `;
//       resultDiv.appendChild(setResult);
//     } else if (books.numFound === 0) {
//       setResult.innerHTML = `
//             <div class="py-6 bg-red-500 rounded">
//                 <h1 class="text-center tracking-wider text-2xl">Invalid keyword</h1>
//             </div>
//             `;
//       resultDiv.appendChild(setResult);
//     } else {
//       setResult.innerHTML = `
//         <div class="px-8 py-4 text-center bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
//             <span class="flex text-lg rounded-full bg-indigo-500 uppercase px-2 py-1 font-medium mr-3">${result}</span>
//             <span class="font-medium text-lg mr-2 text-left flex-auto">results found</span>
//             <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
//         </div>
//         `;
//       resultDiv.appendChild(setResult);
//     }

//     // slice for 24 items
//     const bookSlice = books.docs.slice(0, 24);
//     spinner.classList.remove("flex");
//     spinner.classList.add("hidden");

//     bookSlice.forEach((book) => {
//       // missing cover image condition
//       const imgUrl = () => {
//         if (book.cover_i) {
//           return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
//         } else {
//           return `https://i.ibb.co/tP4nsSW/cover-Not-Available.png`;
//         }
//       };

//       // conditions for checking the properties
//       const authorName = !book.author_name
//         ? "Author Name Is Not Given"
//         : book.author_name[0];
//       const publishYear = !book.first_publish_year
//         ? "Publish year Is Not Given"
//         : book.first_publish_year;
//       const publisher = !book.publisher
//         ? "Publish year Is Not Given"
//         : book.publisher[0];
//       const bookDiv = document.createElement("div");
//       bookDiv.classList.add("shadow-xl", "rounded", "bg-white", "p-6");

//       // Book Container
//       bookDiv.innerHTML = `
//             <img class="w-full h-80 mb-4" src=${imgUrl()}>
//             <h1 class="text-2xl mb-2 font-medium">${book.title.slice(
//               0,
//               15
//             )}</h1>
//             <h2 class="text-lg mb-2"><span class="text-gray-700 font-semibold">Author :<span> <span class="text-gray-600 text-lg">${authorName}</span></h2>
//             <h2 class="text-lg mb-2"><span class="text-gray-700 font-semibold">Publisher :<span> <span class="text-gray-600 text-lg">${publisher}</span></h2>
//             <h2 class="text-lg"><span class="text-gray-700 font-semibold">First PublishYear :</span> <span class="text-gray-600 text-lg">${publishYear}</span></h2>
//             `;
//       bookContainer.appendChild(bookDiv);
//     });
//   };
// });
