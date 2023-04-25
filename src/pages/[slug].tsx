import request, { gql } from 'graphql-request'
import React from 'react'
import { Posts, Props, QUERY } from '.';
interface Post{
  post:Posts
}
interface PostData{
  data:Posts
}
export const QUERYS = gql`
query Post($slug:String!){
  post(where:{slug:$slug}){
    id
    title
    datePublished
    slug
    content {
      html
    }
    photo {
      createdBy {
        id
      }
  }
}}
`
const Post = ({data}:PostData) => {
  return (
    <div>
      <p>{data.title}</p>
      <p dangerouslySetInnerHTML={{ __html: data.content.html }}></p>
      <p></p>
    </div>
  )
}
export default Post

export async function getStaticProps({params}:any) {
  const variables = { slug: params.slug }; 
  const data:Post = await request('https://api-ap-northeast-1.hygraph.com/v2/clgvphora0uuc01uefl0l1adb/master',QUERYS, variables)
  return {
    props: {
      data:data.post
    }, 
  }
}

export async function getStaticPaths() {
  const data:Props = await request('https://api-ap-northeast-1.hygraph.com/v2/clgvphora0uuc01uefl0l1adb/master',QUERY)
  const paths = data.posts.map((data:Posts) =>{
    return { params: { slug: data.slug } }
  })
  return {
    paths:paths,
    fallback: false, 
  }
}