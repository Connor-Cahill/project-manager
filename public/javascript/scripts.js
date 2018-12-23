

/////Was messing with FormData but for some reason express is not able to read the FormData???
///QUESTION TO MAYBE GET HELP ON

// const projectForm = document.getElementById('post-project-form');
// const fake = new FormData();
// fake.append('name', 'Fake Project');
// fake.append('description', 'This is for testing purposes');
// fake.append('repoLink', 'working.com')
// console.log(fake)
// axios.post('/projects', fake)
// .then(res => console.log('Something did happen'))
// .catch(err => console.log(err))

// //Function for New Project Form. Uses axios to send form data to server.   
// function postProject() {
//     const data = new FormData();
//     data.append('name', projectForm.name.value);
//     data.append('description', projectForm.description.value);
//     data.append('repoLink', projectForm.repoLink.value);
//     console.log(data)
//     axios({
//         method: 'post',
//         url: '/projects',
//         data: data
//     })
//     .then(res => {
//         console.log(res)
//         window.location.replace('/')  // Once we have show-project view make this redirect there
//     })
//     .catch(err => console.log(err))
//}
