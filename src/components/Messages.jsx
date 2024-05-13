import { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const featchMessages = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-backend-287f.onrender.com/api/v1/message/allmessage",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.data.message);
      }
    };
    featchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <section className="page messages">
        <h1>MESSAGE</h1>
        <div className="banner">
          {messages && messages.length > 0 ? (
            messages.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <div className="details">
                    <p>
                      First Name: <span>{element.firstName}</span>
                    </p>
                    <p>
                      Last Name: <span>{element.lastName}</span>
                    </p>
                    <p>
                      Email: <span>{element.email}</span>
                    </p>
                    <p>
                      Phone: <span>{element.phone}</span>
                    </p>
                    <p>
                      Message: <span>{element.message}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Messages!</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default Messages;
