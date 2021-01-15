import React from 'react'
import {graphql} from 'gatsby';
import Layout from "../../components/Layout"
import SEO from "../../components/Seo"
import {Wrapper, Image } from "../templateStyles/artistStyles";

const FilmTemplate = ({
    data:{
        wpcontent:{
            film:{
                film,
                genres:{edges:genres},
            }
        }
    }
}) => {
  const {picture1, picture2, picture3} = film.pictures
  const pictures = [picture1, picture2, picture3]
    return (
        <Layout>
            <SEO title= "film"/>
            <Wrapper>
            <div className="artist-container">
            <div className="artist-image">
                <Image
                    fluid={film.cover.imageFile.childImageSharp.fluid}
                    alt={film.cover.altText}
                />
                <div className="roles">
                    {genres.map(({ node: genre }) => (
                        <div key={genre.name} className="role">
                        {genre.name}
                    </div>
                ))}
                </div>
            </div>


            <div className="artist-info">
          <h2>
            {film.name} 
          </h2>
          <p className="description">{film.description}</p>
          <p className="info">
            <strong>Actors:</strong> {film.actors}
          </p>
          <p className="info">
            <strong>Director:</strong> {film.director}
          </p>
          <p className="info">
            <strong>Duration:</strong> {film.duration}
          </p>
          <p className="info">
            <strong>rating:</strong> {film.rating} /5
          </p>
          <p className="info">
            <strong>release date:</strong> {film.releaseDate} 
          </p>
        </div>
            </div>
            <div className="artist-pictures">
               {pictures.map((picture, i) => (
          <div key={i} className="artist-picture">
            <Image
              fluid={picture.imageFile.childImageSharp.fluid}
              alt={picture.altText}
            />
          </div>
        ))}
      </div>

            </Wrapper>
        </Layout>
    )
  }
  
  export default FilmTemplate



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