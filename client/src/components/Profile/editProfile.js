// import React, from "react";


// const editProfile = () => {
//     return (
// <div id="editProfileContainer"></div>

// <script src="build/auth0-editprofile-widget.min.js"></script>

// <script type="text/javascript">

// var editProfileWidget = new Auth0EditProfileWidget('editProfileContainer', { domain: auth_domain }, [
//     { label: "Name", type:"text", attribute:"name",
//       validation: function(name){
//           return (name.length > 10 ? 'The name is too long' : null);
//       }
//     },

//     { label: "Lastname", type:"text", attribute:"lastname" },

//     { label: "BirthDay", type:"date", attribute:"birthday" },

//     { label: "Type", type:"select", attribute:"account_type",
//       options:[
//         { value: "type_1", text:"Type 1"},
//         { value: "type_2", text:"Type 2"},
//         { value: "type_3", text:"Type 3"}
//       ]
//     }
// ]);

// editProfileWidget.init(user_token);

// </script>
//     )
// }