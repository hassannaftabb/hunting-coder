import React from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/Blog.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import * as fs from 'fs'


const Slug = (props) => {
  function createMarkup(c) {
    return {__html: c};
  }  
  const [blog, setblog] = useState(props.myBlog)
  const router = useRouter();
  return <>
  <div className={styles.container}>
    <main className={styles.main}>
      <h1>{blog && blog.title}</h1>
     {blog && <div dangerouslySetInnerHTML={createMarkup(blog.desc)}></div>}
      <div>
      <h3>Author:</h3><p>{blog && blog.author}</p>
      </div>
      </main>
  </div>
    </>
}



export async function getStaticPaths() {
  return {
    paths: [
      {params:{slug: 'how-to-learn-flask'}},
      {params:{slug: 'how-to-learn-nextjs'}},
      {params:{slug: 'how-to-learn-js'}}, 
    ],
    fallback: true // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  let {slug} = context.params;
  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8');
  return {
    props: {myBlog: JSON.parse(myBlog)}, // will be passed to the page component as props
  }
}

export default Slug