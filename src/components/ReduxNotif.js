import { useDispatch } from "react-redux";
import { addNotification } from "./actions";

function ReduxNotif() {
  const dispatch = useDispatch();

  const handleUploadSuccess = () => {
    dispatch(addNotification({ type: "success", message: "Image uploaded successfully" }));
  };

  const handleProfileUpdate = () => {
    dispatch(addNotification({ type: "success", message: "Profile has been updated" }));
  };

  return (
    <div>
      <button onClick={handleUploadSuccess}>Upload Image</button>
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
}

export default ReduxNotif;
