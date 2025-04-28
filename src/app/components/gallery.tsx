import Image from "next/image";
export default function GalleryTest(){
    let gallery=[]

    for (let a=0 ; a < 9 ; a++) {
        gallery.push(
            <div className="relative aspect-square h-33 max-w-50" key={a}> 
            <Image
            src={`https://picsum.photos/seed/picsum${a*123}/400/500`}
            alt="Waow!!"
            fill
            objectFit="cover"
            className="z-10"
            />
        </div>
        )
    }

    return(
        <div className="relative flex justify-center items-center">
            <div className="columns-3 gap-4">
            <h1 className="font-mono text-6xl"> Gallery </h1>
                {gallery}
            </div>
        </div>
    );
}
