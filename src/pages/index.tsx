import { request, gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import Link from 'next/link';
// ここで初期化
export const QUERY = gql`
{
  posts {
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
  }
}
`
export  interface CreatedBy{
  id:string;
}
export interface Html{
  html:string;
}
export interface Posts{
  id: string;
  title:string;
  datePublished:string;
  slug: string;
  content:Html,
  photo: CreatedBy;
}
export interface Props{
  posts:Posts[]
}
export interface Data{
  data:Posts[]
}

export default function Home({data}:Data) {
  console.log(data);
  return (
    <div>
      {data.map((data:Posts) =>(
        <div key={data.id}>
          <Link href={`/${data.slug}`}>
          <h1>{data.title}</h1>
          </Link>
        </div>
      ))}
    </div>
  )
}
export async function getStaticProps() {
  const data:Props = await request('https://api-ap-northeast-1.hygraph.com/v2/clgvphora0uuc01uefl0l1adb/master',QUERY)
  return {
    props: {
      data:data.posts
    }, 
  }
}


