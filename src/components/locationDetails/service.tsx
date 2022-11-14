import * as React from "react";

type services = {
  servicefrance: any;
};
const Service = (props: services) => {
  const { servicefrance } = props;

  // console.log(servicefrance,"servicefrance")
  let array=[]
 
 
  return (
    <>
    {servicefrance.map((i:any,index:any)=>{
      
      if(i.c_categoryType!=i[index+1]){
        return(
          <>
           <section className="text-#000 text-center mt-4">
            <h2 className="text-3xl font-bold text-[#001f46]">{i.c_categoryType}</h2>
            <div className="grid grid-cols-2 gap-4 mb-7">
              <div>
                {i.c_categoryIcon?<>
                  <img src={i.c_categoryIcon.image.url} className="mx-auto shadow-lg mt-6 mb-4" alt="" />
                </>:<>
                </>
  
                }
  
                  <a href="https://www.franceparebrise.fr/prestation/poids-lourd" className="font-bold mb-2"> {i.name}</a>
              </div>
            
            </div>
          </section>
          </>
        )
      }
   
    })
}

         {/* <section className="text-#000 text-center mt-4">
          <h2 className="text-3xl font-bold text-[#001f46]">{"Services proposés"}</h2>
          <div className="grid grid-cols-2 gap-4 mb-7">
            <div>
                <img src={c_service[0].image.url} className="mx-auto shadow-lg mt-6 mb-4" alt="" />
                <a href="https://www.franceparebrise.fr/prestation/poids-lourd" className="font-bold mb-2"> {c_service[0].text}</a>
            </div>
            <div>
                <img src={c_service[1].image.url} className="mx-auto shadow-lg mt-6 mb-4" alt="" />
                <a href="https://www.franceparebrise.fr/prestation/poids-lourd" className="font-bold mb-2"> {c_service[1].text}</a>
            </div>
          </div>
        </section> */}
       </>
  );
};

export default Service;