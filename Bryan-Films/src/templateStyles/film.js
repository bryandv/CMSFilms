import React from 'react'
import {graphql} from 'gatsby';
import Layout from "../../components/Layout"
import SEO from "../../components/Seo"
import {Wrapper, Image } from "../templateStyles/artistStyles"


const filmTemplate = ({
    data:{
        wpcontent:{
            film:{
                film,
                genres:{edges:genres},
            },
        },
    },
}) =>{
    const { picture1, picture2, picture3 } = film.pictures
    const pictures = [picture1,picture2,picture3]
    return <Layout>
        <SEO title="Film" />
    </Layout>
}



export const pageQuery = graphql`
query ($id: ID!) {
    wpcontent {
      film(id: $id, idType: ID) {
        genres {
          edges {
            node {
              name
            }
          }
        }
        film {
          actors
          description
          director
          duration
          name
          rating
          releaseDate
          storyline
          cover {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                    }
              }
            }
          }
          pictures {
            picture3 {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75){
                    ...GatsbyImageSharpFluid_withWebp
                    }
                }
              }
            }
            picture2 {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75){
                    ...GatsbyImageSharpFluid_withWebp
                    }
                }
              }
            }
            picture1 {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75){
                    ...GatsbyImageSharpFluid_withWebp
                    }
                }
              }
            }
          }
        }
        id
      }
    }
  }
  
`