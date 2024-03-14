import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const posts = [
    {
      id: 1,
      title: "2024 top tech jobs",
      desc: "AI/Machine Learning Engineer: With the increasing integration of AI and machine learning across various industries, the demand for engineers skilled in designing and implementing AI algorithms and models was expected to remain high.",
      img: "https://images.app.goo.gl/pdhwar73VbnnpRet7",
    },
    {
      id: 2,
      title: "Fourth Industrial Revolution",
      desc: "The Fourth Industrial Revolution builds upon the digital revolution of the Third Industrial Revolution but involves a fusion of technologies that blur the lines between physical, digital, and biological spheres. It's marked by the integration of smart technologies, automation, artificial intelligence, and the internet of things into various aspects of society and industry",
      img: "https://images.app.goo.gl/7ojkVpuGWfcpTVQe9",
    },
    {
      id: 3,
      title: "tech to better your fitness",
      desc:"Fitness Trackers: Devices like Fitbit, Garmin, or Apple Watch can monitor your heart rate, track steps, distance traveled, calories burned, and even monitor sleep patterns. They provide real-time feedback, helping you stay accountable and motivated." ,
      img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "third world countries becoming technologically savvy",
      desc:"Access to Information: The proliferation of the internet and mobile technology has facilitated access to information even in remote areas. This has enabled people in developing countries to educate themselves about technology and its potential applications.!" ,
      img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Femeritus.org%2Fwp-content%2Fuploads%2F2023%2F12%2Ftech-jobs-2024-1024x536.png&tbnid=LC-bsA_Q-GlBJM&vet=1&imgrefurl=https%3A%2F%2Femeritus.org%2Fblog%2Ftop-tech-jobs-2024%2F&docid=JFZsXajC7RUM3M&w=1024&h=536&hl=en-ZA&source=sh%2Fx%2Fim%2Fm1%2F4&kgs=67adee46b6f665cc&shem=trie",
    },
  ];

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-img">
              <img src={post.img} alt="post cover" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.desc}</p>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
