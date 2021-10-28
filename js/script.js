/*
Treehouse Techdegree:
FSJS Project 2 - list Pagination and Filtering
*/

/*
This function displays 9 students per page with their information.  Pagination
is included with the addPagination function.
*/
function showPage(list, page){
   const studentsPerPage = 9;
   const startIndex = page * studentsPerPage - studentsPerPage;
   const endIndex = page * studentsPerPage;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for(let i = 0; i< list.length; i++){
      if(i >= startIndex  && i < endIndex){
         // Start of list elements
         // *NOTE* I used two different methods for adding the markup, for practice.
         const studentLI = document.createElement(`li`);
         studentLI.className = 'student-item cf';
        
         // student-details div
         const studentDetails = document.createElement('div');
         studentDetails.className = 'student-details';

         const avatar = document.createElement('img');
         avatar.className = 'avatar';
         avatar.src = list[i].picture.large;
         avatar.alt = 'Profile Picture';

         const studentName = document.createElement('h3');
         studentName.innerHTML = list[i].name.first + " " + list[i].name.last;

         const studentEmail = document.createElement('span');
         studentEmail.className = 'email';
         studentEmail.innerHTML = list[i].email;
         // End of student-details div

         // Start joined-details div
         const joinedDetails = document.createElement('div');
         joinedDetails.className = 'joined-details';

         const joinDate = document.createElement('span');
         joinDate.className = 'date';
         joinDate.innerHTML = `Joined ${list[i].registered.date}`
         // End of joined-details div

         studentList.appendChild(studentLI);
         studentLI.appendChild(studentDetails);
         studentDetails.appendChild(avatar);
         studentDetails.appendChild(studentName);
         studentDetails.appendChild(studentEmail);

         studentLI.appendChild(joinedDetails);
         joinedDetails.appendChild(joinDate);
      }
   }

}


/*
This function adds pagination which includes a loop to display a variable number of pages.
*/
function addPagination(list){
   const numberOfStudents = 9;

   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for(let i = 0; i <list.length / numberOfStudents; i++){
      const buttonList = document.createElement('li');
      const listButton = document.createElement('button');
      listButton.className = 'removable';
      listButton.innerHTML = i + 1;
      
      linkList.appendChild(buttonList);
      buttonList.appendChild(listButton);
   }
   
   const firstButton = linkList.firstChild.firstChild;
   firstButton.className = 'active';

   linkList.addEventListener('click', (e) => {
      const active = document.querySelector('.active');
      const inactive = document.getElementsByTagName('button')

      for(const button of inactive){
         if(e.target === button){
            active.classList.remove('active');
            e.target.classList.add('active');
            showPage(list, e.target.innerHTML);
         }
      }
   });

}

// Search Bar
// Create Search Bar
function createSearchBar(list){
   const header = document.querySelector('.header');
   // *NOTE* This is the second method of adding markup I used for practice.
   const markUp = `
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   `;
   const searchBar = document.createElement('label');
   searchBar.className = 'student-search';
   searchBar.innerHTML = markUp;
   header.insertAdjacentElement('beforeend', searchBar);
   
   // Search Bar Functionality
   const search = document.querySelector('#search');
   const button = document.querySelector('button');
   function searchCase(){
   let storage = [];
   let searchInput = search.value;
   for (let i = 0; i < list.length; i++){
      let nameFirst = list[i].name.first.toLowerCase();
      let nameLast = list[i].name.last.toLowerCase();
      searchInput = searchInput.toLowerCase();
      if(nameFirst.includes(searchInput) ||nameLast.includes(searchInput) ){
         storage.push(list[i])
         showPage(storage, 1);
         addPagination(storage);
      }
   }
   // No results found conditional
   if(storage.length === 0 ){
      const buttons = document.querySelectorAll('.removable');
      showPage(storage,1)
      const studentList = document.querySelector('.student-list');
      results = document.createElement('h3');
      results.textContent = 'No Results Found';
      studentList.appendChild(results);
      for (i = buttons.length - 1; i >= 0; i--){
         buttons[i].remove();
      }

   }
}
   // Event listeners to track typing or clicking submit
   search.addEventListener('keyup', () =>{
      searchCase()
   });
   button.addEventListener('click', () => {
      searchCase();
   })
}


// Function Calls
showPage(data, 1);
addPagination(data);
createSearchBar(data);