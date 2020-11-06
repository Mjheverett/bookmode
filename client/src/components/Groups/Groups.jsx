// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { makeStyles } from '@material-ui/core/styles';
// import { Container, GridList, GridListTile, Popover, Typography, Button }  from '@material-ui/core';
// import GroupsList from './GroupsList';

// const useStyles = makeStyles((theme) => ({
    
// }));

// const Groups = () => {
//     const [groups, setGroups] = useState({});
//     const classes = useStyles();

//     useEffect(() => {
//         setLibrary(libraryBooks);
//         axios.get('http://localhost:3000/library')
//             .then(res => {
//                     const data = res.data;
//             console.log('data:', data)
//             });
//     }, []);

//     const [anchorEl, setAnchorEl] = React.useState(null);

//     const handleClick = (event) => {
//             setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const _handleNameChange = (data) => {
//         console.log(data)
//         setShelfName(data);
//     };

//     const _handleDescChange = (data) => {
//         console.log(data)
//         setShelfDescription(data);
//     };

//     const _handleCreateShelf = (e) => {
//         e.preventDefault();
//         const data = {
//             shelfName: name,
//             shelfDescription: description
//         };
//         axios.post('http://localhost:3000/library/add', data)
//             .then(res => console.log(res))
//             .catch(err => console.log(err));
//     };
    
//     return (
//         <>
//             <Container maxWidth="lg">
//                 <Typography variant="h2">Groups</Typography>
//                 <br />
//                 <Button type="button" color="secondary" aria-describedby={id} variant="contained" size="medium" onClick={handleClick}>Create new group</Button>
//                 <div>
//                     <p>Are you a fan of creating shelves? Well, have I got a form for you!!</p> 
//                     <form onSubmit={_handleCreateShelf}>
//                         <label>Shelf Name:
//                             <input 
//                                 name='shelfName' 
//                                 onChange={(event) => _handleNameChange(event.target.value)} 
//                             />
//                         </label>
//                         <label>Shelf Description
//                             <textarea 
//                                 name='shelfDescription'
//                                 onChange={(event) => _handleDescChange(event.target.value)} 
//                             />
//                         </label>
//                         <Button type="submit" color="secondary" aria-describedby={id} variant="contained" size="medium" onClick={handleClick}>Create New Shelf</Button>
//                         <Button type="button" color="default" aria-describedby={id} variant="outlined" size="medium" onClick={handleClick}>Cancel</Button>
//                     </form>
//                 </div>
//                 <br />
//                 <br />
//                 <GroupsList list={"User"} />
//                 <GroupsList list={"All"} />
//             </Container>
//         </>
//     )
// }

// export default Groups;
