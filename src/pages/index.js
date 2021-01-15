import React from "react"
import {useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, Artist} from "../pageStyles/pageStyles"


const IndexPage = () => {
  const{
    wpcontent:{
      page:{
        homePageMeta:{
          homePageHeaderDescription,
          homePageHeaderTitle,
          homePageFeaturedFilms,
          homePageHeaderPicture
        }
      }
    }
  } = useStaticQuery(graphql`
  query{
    wpcontent {
      page(id: "home-page", idType: URI) {
        homePageMeta {
          fieldGroupName
          homePageDescription
          homePageHeaderDescription
          homePageHeaderTitle
          homePageHeaderPicture {
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
          homePageFeaturedFilms {
            ... on WPGraphql_Film {
              id
              slug
              film {
                name
                cover {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(grayscale: true, quality: 100){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `)

//console.log(homePageDescription,homePageHeaderDescription,homePageHeaderTitle,homePageFeaturedFilms,homePageHeaderPicture);
  return <Layout>
    <SEO title = "Home Page"/>
    <Wrapper>
    <div className= "banner"> 
        <Image 
        fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} 
        alt={homePageHeaderPicture.altText}/>

        <div className="inner-div">
        <p className= "header-title">{homePageHeaderTitle}</p>
        <p className= "header-description">{homePageHeaderDescription}</p>
        </div>

        </div>

        <div className="artists">
          <h2>Featured Films</h2>
          <div className="artist-items">
            {homePageFeaturedFilms.map(({film, slug}) => (
              <Artist key={slug} to={`/${slug}`}>
                <Image
                  fluid={film.cover.imageFile.childImageSharp.fluid}
                  alt={film.cover.altText}
                />
                <div className="artist-info">
                  <p>
                    {film.name}
                  </p>
                </div>
              </Artist>
            ))}
          </div>
        </div>
      
    </Wrapper>
  </Layout>
}

export default IndexPage
