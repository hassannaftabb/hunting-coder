import React, {useEffect, useState} from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link'
import * as fs from 'fs'
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {
  
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(2)
  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count+2}`);
    setCount(count+2)
    let data = await d.json();
    setBlogs(data);
  };
  return <>
    <style jsx>{`h1{font-size: 48px;} h2{font-size: 28px;}`}</style>
    <div className={styles.container}>
    <main className={styles.main}>

    <InfiniteScroll
  dataLength={blogs.length} //This is important field to render the next data
  next={fetchData}
  hasMore={props.allCount !== blogs.length}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>You are all Caught Up!</b>
    </p>
  }
>
<h1 className={styles.mainH1}>MY BLOGS</h1>
{blogs.map((blogitem)=>{
        return  <>
        <div className={styles.blogItem} key={blogitem.title}>
        <Link passHref href={`/blogpost/${blogitem.slug}`}>
        <h2>{blogitem.title}</h2>     
         </Link>
        <p className={styles.blogItemP}>{blogitem.metadesc.substr(0, 140)}</p>
        <button type="submit" className={styles.button}><Link passHref href={`/blogpost/${blogitem.slug}`}>READ MORE</Link></button>
      </div>
      </>
      })}
</InfiniteScroll>
</main>
</div>
  </>
}

export async function getStaticProps(context) {
  let data = await fs.promises.readdir('blogdata');
  let allCount = data.length;
  let myfile;
  let allBlogs =[];
  for (let index = 0; index < 2; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(('blogdata/'+ item), 'utf-8');
    allBlogs.push(JSON.parse(myfile))
  }
  return {
    props: {allBlogs, allCount}, // will be passed to the page component as props
  }
}

export default Blog