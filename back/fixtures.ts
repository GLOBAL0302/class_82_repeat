import mongoose from "mongoose"
import config from "./config"
import Artist from "./modules/Artist";
import Album from "./modules/Album";
import Track from "./modules/Track";

const run = async()=>{

    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try{
        await db.dropCollection("albums")
        await db.dropCollection("artists")
        await db.dropCollection("tracks")
        await db.dropCollection("trackHistories")
        await db.dropCollection("users")

    }catch(e){
        console.log("Collection were not created")
        
    }

    const [eminem, pitbull]= await Artist.create({
        title:"Eminen",
        image:"fixtures/eminem.jpg",
        description:"Eminem (born October 17, 1972, St. Joseph, Missouri, U.S.) is an American rapper, record producer, and actor who is known as one of the most-controversial and best-selling artists of the early 21st century. He was the first recording artist to have 10 consecutive albums debut at number one on the Billboard album chart."
    },
    {
    title: "Pitbull",
    image:"fixtures/pitbull.jpg",
    description:"Pitbull, whose real name is Armando Christian Pérez, is a Cuban-American rapper, singer, and songwriter known for his reggaeton-infused party pop and energetic performance style. He is often characterized by his trademark catchphrase, and his frequent references to his hometown of Miam"
    })

    const [eminem_album_1, eminem_album_2, pitbull_album_1, pitbull_album_2]= await Album.create(
        {
           title:"Encore",
           artist:eminem,
           created_at:2004,
           image: "fixtures/eminem_album_1.jpg"
        },
        {
            title:"The eminem Show",
            artist:eminem,
            created_at:2004,
            image: "fixtures/eminem_album_2.jpg"
         },
         {
            title:"DALE",
            artist:pitbull,
            created_at:2015,
            image: "fixtures/pitbull_album_2.jpg"
         },
         {
            title:"Planet Pit",
            artist:pitbull,
            created_at:2018,
            image: "fixtures/pitbull_album_2.jpg"
         }
    );

    await Track.create(
        {
            title:"Curtain Up",
            album:eminem_album_1,
            track_number:1,
            duration:"3:32"
        },
        {
            title:"Never Enough",
            album:eminem_album_1,
            track_number:2,
            duration:"3:12"
        },
        {
            title:"Puke",
            album:eminem_album_1,
            track_number:3,
            duration:"3:53"
        },
        {
            title:"Mosh",
            album:eminem_album_1,
            track_number:4,
            duration:"3:31"
        },
        {
            title:"Yellow Brick",
            album:eminem_album_1,
            track_number:5,
            duration:"3:32"
        },

        {
            title:"White America",
            album:eminem_album_2,
            track_number:1,
            duration:"3:39"
        },
        {
            title:"Soldier",
            album:eminem_album_2,
            track_number:2,
            duration:"3:34"
        },
        {
            title:"Drips",
            album:eminem_album_2,
            track_number:3,
            duration:"3:38"
        },
        {
            title:"Business",
            album:eminem_album_2,
            track_number:4,
            duration:"3:29"
        },
        {
            title:"The Kiss",
            album:eminem_album_2,
            track_number:5,
            duration:"3:39"
        },

        {
            title:"El Taxi",
            album:pitbull_album_1,
            track_number:1,
            duration:"3:39"
        },
        {
            title:"Chi Chi Bon Bon",
            album:pitbull_album_1,
            track_number:2,
            duration:"3:54"
        },
        {
            title:"Mami Mami",
            album:pitbull_album_1,
            track_number:3,
            duration:"3:45"
        },
        {
            title:"El Party",
            album:pitbull_album_1,
            track_number:4,
            duration:"3:12"
        },
        {
            title:"Baddest",
            album:pitbull_album_1,
            track_number:5,
            duration:"3:25"
        },

        {
            title:"Rain Over me",
            album:pitbull_album_2,
            track_number:1,
            duration:"3:15"
        },
        {
            title:"Shake Senora",
            album:pitbull_album_2,
            track_number:2,
            duration:"3:05"
        },
        {
            title:"Come on Go",
            album:pitbull_album_2,
            track_number:3,
            duration:"3:55"
        },
        {
            title:"International",
            album:pitbull_album_2,
            track_number:4,
            duration:"3:35"
        },
        {
            title:"Hey Baby",
            album:pitbull_album_2,
            track_number:5,
            duration:"3:54"
        },
    )
    await db.close();
}
run().catch(console.error)