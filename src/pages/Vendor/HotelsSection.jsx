import React, { useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import HotelListCard from '../../components/HotelListCard';
import { linkedHotels } from "../../store/actions/vendor";
import { useSelector, useDispatch } from 'react-redux';

function HotelsSection() {
    const dispatch = useDispatch();
    const { linkedHotelsData } = useSelector((state) => state.vendor);


    useEffect(()=>{
        const linkHotel = async() => {
            await dispatch(linkedHotels())
        }
        linkHotel()
        console.log("hi")
    },[])
    // console.log(linkedHotelsData, "hotels")

    return ( 
    <section>
              <div className="flex flex-col ml-6">
        <div className="flex flex-row justify-between mt-10 mb-4">
          <h2 className="text-3xl font-bold mb-4">My Hotels</h2>
          <SearchBar />
        </div>
        <div className="py-3 h-[67vh] bg-[#EFE5D8] rounded-lg p-1  flex flex-wrap overflow-y-auto hide-scrollbar justify-evenly ">
        {linkedHotelsData?.map((hotel, index)=>(
            <HotelListCard key={`${index}`} hotel={hotel} />
        ))}
        </div>
      </div>
    </section> 
    );
}

export default HotelsSection;