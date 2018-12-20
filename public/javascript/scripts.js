

// // ////Figure out why this way was not working??


// // // /// Function that takes form data and sends to server to create new project
// function postProject(e) {
//     console.log('btn clicked')
//     e.preventDefault();
//     const form = e.target;
//     const data = new FormData(form);
//     const newProject = {
//         name: data.get('name'),
//         description: data.get('description'),
//         repoLink: data.get('repoLink')
//     }
    
//     axios({
//         method: 'post',
//         url: '/projects',
//         data: newProject
//     })
//     .then(response => {
//         console.log('redirecting ... ... ')
//         window.location.replace('/');
//         /// later replace with:  `/projects/${response.data._id}`
        
//     })
//     .catch(err => console.log(err))
// }

