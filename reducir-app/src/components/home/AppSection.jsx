
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import icon1 from "../../covers/icons/achievements-icon.png";
import icon2 from "../../covers/icons/actions-icon.png";
import icon3 from "../../covers/icons/benefits-icon.png";
import nature from '../../covers/nature.jpg';

function AppSection() {
    return (
        <div className="section4 backgroundTexture min-h-screen">
            <section className="pt-[15%] pb-[5%]">
                <h2 className="text-center text-4xl pb-[6%]">
                    Proponé tus objetivos y <span className="block">compartí tus logros con la comunidad</span>
                </h2>
                <div className="container mx-auto bg-white rounded-[60px]  w-9/12 shadow">
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={true}
                        modules={[Navigation, Pagination]}
                        pagination={true}
                        loop={true}
                    >
                        {/* Primer slide */}
                        <SwiperSlide>
                            <div className="flex items-center justify-center p-6">
                                <div className="w-1/2 p-4 flex flex-col gap-10 justify-between">
                                    <h3 className="text-3xl">Acciones</h3>
                                    <p className="text-2xl">¡Estas son algunas de las marcas sustentables que nos acompañan!</p>
                                    <p className="text-2xl">¡Estas son algunas de las marcas sustentables que nos acompañan!</p>
                                    <div className="w-5/6 flex justify-center gap-8">
                                        <img src={icon1} alt="w-full" />
                                        <img src={icon2} alt="" />
                                        <img src={icon3} alt="" />
                                    </div>
                                </div>
                                <div className="w-[45%] -mt-[6%]">
                                    <img src={nature} alt="w-full" />
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Segundo slide (puedes duplicar y personalizar este código para más slides) */}
                        <SwiperSlide>
                            <div className="flex items-center justify-center p-6">
                                <div className="w-1/2 p-4 flex flex-col gap-10 justify-between">
                                    <h3 className="text-3xl">Acciones</h3>
                                    <p className="text-2xl">¡Estas son algunas de las marcas sustentables que nos acompañan!</p>
                                    <p className="text-2xl">¡Estas son algunas de las marcas sustentables que nos acompañan!</p>
                                    <div className="w-5/6 flex justify-center gap-8">
                                        <img src={icon1} alt="w-full" />
                                        <img src={icon2} alt="" />
                                        <img src={icon3} alt="" />
                                    </div>
                                </div>
                                <div className="w-[45%] -mt-[6%]">
                                    <img src={nature} alt="w-full" />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default AppSection;