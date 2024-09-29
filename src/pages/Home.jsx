import { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const response = await axios.get("https://pranjal-blog-project.onrender.com/blog");
    setBlogs(response.data.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  console.log(blogs);

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap">
        {blogs.map(function (blog) {
          return (
            // eslint-disable-next-line react/jsx-key
            <Card blog={blog} />
          );
        })}
      </div>
    </>
  );
}

export default Home;
