// import React from "react";
// import { useEffect } from "react";
// export default  function UpdateChats() {
//   useEffect(
//     () => {
//       async function fetchMessages() {
//         console.log("fetch messages function called");
//         const messages = await axios.post(
//           "https://localhost:2003/search-users/get-messages",
//           {
//             room: currentChat.room,
//           }
//         );
//         dispatch(addMessages(messages.data));
//       }
//       fetchMessages();
//     },
//     [currentChat]
//   );
//   return <></>;
// }
