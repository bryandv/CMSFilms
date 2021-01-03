import React from 'react'
import {useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, BottomEdgeDown,BottomEdgeUp,Artist} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"



const FilmsPage = () =>{
const {
    wpcontent:{
      page:{
        filmsMeta:{
          filmsPageDescription,
          filmsPageHeaderPicture
        }
      },
        films:{
          edges: films
        }
      
    }
} = useStaticQuery(graphql`
query{
  wpcontent {
    page(id: "films", idType: URI) {
      id
      filmsMeta {
        filmsPageDescription
        filmsPageHeaderPicture {
          altText
          sourceUrl
          imageFile{
            childImageSharp{
            fluid(quality: 100){
            ...GatsbyImageSharpFluid_withWebp
            }
        }
    } 
        }
      }
    }
    films {
      edges {
        node {
          film {
            actors
            description
            director
            duration
            rating
            name
            releaseDate
            storyline
            cover {
              altText
              sourceUrl
              imageFile{
                childImageSharp{
                fluid(quality: 100){
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
}`);
console.log(filmsPageDescription,filmsPageHeaderPicture,films);
return <Layout>
    <SEO title="Films"/>
    <Wrapper artistsColor = {COLORS.BLACK} descriptionColor = {COLORS.SECONDARY}>
        <div className="banner">
        <Image fluid={filmsPageHeaderPicture.imageFile.childImageSharp.fluid}/>
        
        </div>
        <div className="description">
            <h2>Zoek hier u favoriete film</h2>
            <p>{filmsPageDescription}</p>
            
        </div>
        <div className="artists">
            <h2>Onze Films</h2>
            <div className="artist-items">
                {films.map(({node:{film,slug}}) =>(
                    <Artist to={`/${slug}`} key={slug}>
                        <Image fluid={film.cover.imageFile.childImageSharp.fluid} alt={film.cover.altText}/>
                    <div className= "artist-info">
                <p>{film.name}</p>
                
                    </div>
                    </Artist>
                ))}
            </div>
        </div>
    </Wrapper>
</Layout>

}

export default FilmsPage

