"use client";

import { useState } from "react";
import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, AnimatePresence } from "motion/react";
// import Modal from "./modal";
import TestModal from "./artModal";

// import { fas, fad, fass, fasds } from '@awesome.me/'
export default function ProfileIrlPage({ pageReturn }) {
  const [open_profile, OpenProfile] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 256 : -256,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -256 : 256,
      opacity: 0,
    }),
  };

  const goToPage = (newPage) => {
    setDirection(newPage > page ? 1 : -1); // determine direction
    setPage(newPage);
  };

  const MotionImage = motion(Image);

  //   const handleClick = (event) => {
  //     const rect = event.currentTarget.getBoundingClientRect();
  //     setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  //     OpenProfile(true);
  //   };

  const return_ = () => {
    pageReturn("login");
  };

  let content;

  switch (page) {
    case 1:
      content = (
        <motion.div
          key={page}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{
            duration: 0.33,
            bounce: 0.1,
            ease: "easeInOut",
          }}
          className="flex w-auto h-auto"
        >
          <motion.div
            layout
            onClick={() => {
              OpenProfile(true);
            }}
            className="hidden md:flex md:my-auto relative m-4 md:m-3 md:w-76 w-96 md:h-80 overflow-y-auto outline-1 outline-white"
          >
            <MotionImage
              layoutId="profile"
              src={"/img/profile_im_cringing_at_this.jpg"}
              alt="placeholder"
              className="cursor-pointer w-full h-auto object-cover no-scrollbar"
              fill
              objectFit="cover"
            />
          </motion.div>

          <div className="grid py-5 my-auto grid-cols-2 gap-3 px-3 md:px-0 text-lg basis-2/3 font-mono">
            <div className="p-3  border-1 ring-white text-white">Name: </div>
            <div className="p-3  text-white border-1 ring-white">
              Anandaffa Apriadi
            </div>
            <div className="p-3  border-1 ring-white text-white">Title: </div>
            <div className="p-3  text-white text-center border-1 ring-white">
              Full-stack Developer
            </div>
            <div className="p-3 flex items-center justify-center  border-1 ring-white text-white">
              Contact:{" "}
            </div>
            <div className="p-3  text-white border-1 ring-white">
              0822-1122-3413 anandaffa.
              <br className="inline md:hidden" />
              apriadi@gmail
              <br className="inline md:hidden" />
              .com
            </div>
            <div className="p-3  border-1 ring-white text-white">Status: </div>
            <div className="p-3  text-white border-1 ring-white">
              Working, Contract
            </div>
            <div className="p-3 flex items-center justify-center border-1 ring-white text-white">
              Last Education:{" "}
            </div>
            <div className="p-3  text-white border-1 ring-white">
              Binus University (IT), Bachelor Degree (S1)
            </div>
            <a
              href="https://drive.google.com/file/d/1AsD75NDhPs0-to42Zv2b38iQq0zhzBbc/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 p-5 border-1 ring-white text-white
                    transition-colors duration-300 hover:bg-white hover:text-black
                    "
            >
              Resume <i className="fas fa-download"></i>
            </a>
            <button
              onClick={return_}
              className="md:hidden text-white text-center mb-10 hover:bg-white md:0 hover:text-black transition-colors duration-300 font-mono flex justify-start items-center gap-2 p-3 md:p-2"
            >
              <i className="fas fa-arrow-left text-center"></i> Return
            </button>
          </div>
        </motion.div>
      );
      break;

    case 2:
      content = (
        <motion.div
          key={page}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{
            duration: 0.33,
            bounce: 0.1,
            ease: "easeInOut",
          }}
          className="flex flex-col gap-3 text-start text-2xl text-white no-scrollbar"
        >
          <p className="text-white mb-4">
            This site was fully built from scratch. You can check out my source
            code on{" "}
            <a
              href="https://github.com/anandaffA/nextjs-project"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300 transition"
            >
              GitHub
            </a>
            .
          </p>

          <p className="font-semibold">Tools Used:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>React</li>
            <li>Next.js</li>
            <li>Tailwind CSS</li>
            <li>Supabase</li>
            <li>GitHub & Vercel (for deployment)</li>
          </ul>

          <p className="mt-3">
            Except the wallpapers, credits on the site&apos;s footers.
          </p>
        </motion.div>
      );
      break;

    case 3:
      content = (
        <motion.div
          key={page}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{
            duration: 0.33,
            bounce: 0.1,
            ease: "easeInOut",
          }}
          className="flex flex-col text-white text-xl gap-3 text-start no-scrollbar"
        >
          <p className="m-3">
            Graduated from Binus University, took interest in Computer Science
            and finished with Bachelor&apos;s Degree with my super cool super
            awesome 2.88 GPA! Finished a one year internship at PT.PhinCon as a
            Front-end Developer using Laravel, worked in multiple web-dev
            projects with the company throughout the years.
          </p>
          <div className="flex flex-row gap-3">
            <Image
              src={`/img/Screenshot 2025-05-31 113301.png`}
              alt="binus pic"
              width={400}
              height={300}
              className="object-cover"
            />
            {/* --- */}
            <Image
              src={`/img/Screenshot 2025-05-31 113228.png`}
              alt="binus pic"
              width={400}
              height={300}
              className="object-cover"
            />
            {/* --- */}
          </div>
        </motion.div>
      );
      break;

    case 4:
      content = (
        <motion.div
          key={page}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{
            duration: 0.33,
            bounce: 0.1,
            ease: "easeInOut",
          }}
          className="flex flex-col text-white text-xl gap-3 text-start no-scrollbar"
        >
          <p className="m-3">
            Took multiple years of break from IT and started my own Freelance
            Illustrator Career, Drawing has always been my hobby and COVID was
            still a thing, so i figure why not make it into my job?
          </p>
          <div className="flex flex-row gap-3">
            <Image
              src={`/img/Screenshot 2025-05-30 162454.png`}
              alt="preview drawing 1"
              width={300}
              height={100}
              className="object-cover"
            />
            {/* --- */}
            <Image
              src={`/img/Screenshot 2025-05-30 162917.png`}
              alt="binus pic"
              width={500}
              height={100}
              className="object-cover"
            />
          </div>
          <p className="m-3">
            You can check a collection of my drawings in the &apos;Art&apos;
            section of the main screen!
          </p>
        </motion.div>
      );
      break;

    case 5:
      content = (
        <motion.div
          key={page}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{
            duration: 0.33,
            bounce: 0.1,
            ease: "easeInOut",
          }}
          className="flex flex-col text-white text-xl gap-3 text-start no-scrollbar"
        >
          <p className="m-3">
            Even though i thoroughly enjoyed drawing, the freelance gig
            wasn&apos;t sustainable and COVID was over , so i dived back into
            the IT field, Now currently has a working contract at Lintas Borneo
            Line as a Full Stack Developer with Django. And now currently
            working on this site as a passion project!
          </p>
          <p className="m-3">
            I realized this has turned into a powerpoint project, i&apos;ll just
            add more pics to make it up. probably of the cats.
          </p>
        </motion.div>
      );
      break;

    default:
      alert("End of Navigation!");
      setPage(1);
      break;
  }

  return (
    <>
      <div className="relative z-10 items-center flex gap-6 justify-center w-full h-full md:w-[75vw] md:h-[80vh]">
        <label
          onClick={() => {
            goToPage(page - 1);
          }}
          htmlFor=""
          className="text-white hover:text-black hover:bg-white p-3 cursor-pointer transition-colors duration-300"
        >
          <i className="fas fa-arrow-left"></i>
        </label>
        <div className="flex flex-col items-center md:flex-row gap-4 w-[full] h-full md:w-[75vw] md:[h-96vh]">
          <AnimatePresence mode="wait" custom={direction}>
            {content}
          </AnimatePresence>
        </div>
        <label
          onClick={() => {
            goToPage(page + 1);
          }}
          htmlFor=""
          className="text-white hover:text-black hover:bg-white p-3 cursor-pointer transition-colors duration-300"
        >
          <i className="fas fa-arrow-right"></i>
        </label>
      </div>
      <button
        onClick={return_}
        className="hidden text-white text-center  hover:bg-white mb-12 md:0 hover:text-black transition-colors duration-300 font-mono md:flex justify-end items-center gap-2 p-4 md:p-2"
      >
        <i className="fas fa-arrow-left text-center"></i> Return
      </button>

      <TestModal
        isOpen={open_profile}
        layout_id="profile"
        onClose={() => OpenProfile(false)}
      >
        <div
          onClick={() => OpenProfile(false)}
          className="no-scrollbar flex flex-col md:flex-row gap-x-5 h-[64vh] justify-items-start items-center"
        >
          <div className="hidden md:flex md:basis-1/3 relative md:h-full no-scrollbar">
            <MotionImage
              layoutId="profile"
              src={"/img/profile_im_cringing_at_this.jpg"}
              alt="placeholder"
              className="object-cover no-scrollbar"
              fill
            />
          </div>
          <div className="md:basis-2/3 relative h-full border-white px-4 overflow-y-auto no-scrollbar">
            <p className="text-white font-garamond py-5 text-xl text-left">
              Born in Jakarta, Big fan of art and games, unless we&apos;re
              talking about gacha games, those can choke. I do art myself too.
              <br />
              <br />
              Started coding back in college when I decided sleep was optional.
              Did a one-year internship as a PHP developer, graduated, and then
              jumped straight into the chaotic freedom of freelance
              illustration, because what screams financial security more than
              drawing for random people?
              <br />
              <br />
              Currently locked into a working contract as a full-stack dev using
              Django, Bootstrap, and PostgreSQL. Basically juggling both ends of
              the stack like it owes me money.
              <br />
              <br />
              I used to hate JavaScript with the burning passion of a thousand
              devlogs, but now I&apos;m learning React/Next.js on the fly and
              honestly is enjoying it. Tailwind&apos;s also cool.
              <br />
              <br />
              Adding this photo is a bad idea.
            </p>
          </div>
        </div>
      </TestModal>
    </>
  );
}
