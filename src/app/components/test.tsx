import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const data = [
  {
    id: 1,
    name: "react",
    dec: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, molestiae.",
    img: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=50827fd8476bfdffe6e04bc9ae0b8c02",
  },
  {
    id: 2,
    name: "garphql",
    dec: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, molestiae.",
    img: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=50827fd8476bfdffe6e04bc9ae0b8c02",
  },
  {
    id: 3,
    name: "js",
    dec: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, molestiae.",
    img: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=50827fd8476bfdffe6e04bc9ae0b8c02",
  },
  {
    id: 4,
    name: "nodejs",
    dec: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, molestiae.",
    img: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=50827fd8476bfdffe6e04bc9ae0b8c02",
  },
  {
    id: 5,
    name: "css",
    dec: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, molestiae.",
    img: "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=50827fd8476bfdffe6e04bc9ae0b8c02",
  },
];

const Blog = () => {
  const [show, setShow] = useState(false);
  const [info, setinfo] = useState();
  // animation for list
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  //  animation for  popup

  const variants = {
    visible: {
      scale: 1.1,
      boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
      y: -50,
      x: -100,
      cursor: "pointer",
      transition: { duration: 1, type: "spring" },
    },
    hidden: { scale: 1, opacity: 0 },
  };
  return (
    <section className="container mx-auto mt-5">
      <motion.ul
        style={{
          filter: show ? "blur(1px)" : "none",
        }}
        className="row d-flex   justify-content-center align-items-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {data.map((cval) => {
          return (
            <>
              <motion.li
                layout
                key={`key_${cval}`}
                className="col-lg-5"
                onClick={() => {
                  setShow(!show);
                  setinfo(cval);
                }}
                variants={item}
              >
                <div
                  className="card position-relative w-100   p-0 "
                  style={{ borderRadius: "2rem" }}
                >
                  <img
                    src={cval.img}
                    className="img-fluid "
                    style={{
                      borderRadius: "inherit",
                    }}
                    alt=""
                  />
                  <h3
                    className="position-absolute text-capitalize text-black-50"
                    style={{
                      top: "17%",
                      left: "40%",
                    }}
                  >
                    {cval.name}
                  </h3>
                </div>
              </motion.li>
            </>
          );
        })}
      </motion.ul>

      <AnimatePresence>
        {show && (
          <>
            <motion.div
              className="card "
              style={{
                position: "fixed",
                top: "30%",
                left: "40%",
              }}
              onClick={() => {
                setShow(!show);
              }}
              variants={variants}
              animate={show ? "visible" : "hidden"}
              exit={{ scale: 1, opacity: 0 }}
            >
              <img src={info.img} className="img-fluid" alt="" srcset="" />
              <h1 className="card-title"> {info.name}</h1>
              <p className="card-text">{info.dec}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
