import Image from "next/image";
import cloud from "../../public/cloud.png"
import cloud2 from "../../public/cloud2.png"
import cloud3 from "../../public/cloud3.png"
import cloud4 from "../../public/cloud4.png"
import star1 from "../../public/star1.png"

export default function Clouds(){
    return (<>
    
        <Image
              src={star1}
              className=" star1"
            />
        <Image
              src={cloud}
              className="clouds cloud1"
            />

        <Image
              src={cloud2}
              className="clouds cloud2"
            />
        <Image
              src={star1}
              className=" star2"
            />
        <Image
              src={cloud3}
              className="clouds cloud3"
            />

        <Image
          src={cloud4}
          className="clouds cloud4"
        />

        <Image
              src={star1}
              className=" star3"
            />
        <Image
              src={cloud3}
              className="clouds cloud3"
            />

        <Image
              src={star1}
              className=" star4"
            />
    
    </>)
}