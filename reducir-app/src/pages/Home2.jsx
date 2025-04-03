import homeApp from '../covers/banner-home-radious.png'
import mockupProfileApp from '../covers/home/mockup-profile-app.png'
import mockupActionsApp from '../covers/home/mockup-actions-app.png'
import { Button } from '@nextui-org/react'
import Community from '../components/home/Community'
import Footer from '../components/Footer'
import Heading from '../components/Base/Heading'
import vectorMiniHojas from '../covers/vector-mini-2.png'
import actionsIcon from '../covers/icons/actions-icon-70x70.png'
import progressIcon from '../covers/icons/progress.png'
import communityIcon from '../covers/icons/community.png'

export function Home2() {
    return (
        <>
            <section className='pt-4 p-8'>
                <img
                    src={homeApp}
                    alt="Captura de pantalla de la aplicación"
                    className="w-full object-cover overflow-hidden "
                />
            </section>
            <section
                className='mx-auto w-5/6 my-32'>
                {/* HEADING */}
                <div className="relative p-2 w-fit mx-auto mb-4">
                    <div className="absolute top-[-25px] left-[-20px] md:left-[-25px]">
                        <img src={vectorMiniHojas} className="animate__animated animate__swing" />
                    </div>
                    <Heading tag="h2" color="darkGreen" weight="semibold" className="mb-6 p-1 relative z-10 text-left">
                        ¿Cómo funciona Reducir App?
                    </Heading>
                </div>
                <div className='w-5/6 mx-auto text-center'>
                    <p className='text-darkGreen'><strong>reducir</strong> es una <strong>aplicación web</strong> y <strong>móvil</strong> que te acompaña en tu día a día ayudándote a
                        incorporar <strong>hábitos amigables</strong> con el <strong>medio ambiente</strong>.</p>
                </div>
                <section
                    className='flex justify-center items-center gap-[142px] my-16'>
                    <div className='w-[230px] text-center flex flex-col gap-6'>
                        {/* CARDS */}
                        <div className='mx-auto w-[100px] h-[100px] bg-[#EFF3C6] p-4 rounded-md flex items-center justify-center'>
                            <img src={progressIcon} alt="" />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Heading tag="h5" color="grey" weight="semibold">Seguí tu progreso  de impacto</Heading>
                            <p>Medí tu huella de carbono
                                y seguí tu progreso.</p>
                        </div>
                    </div>

                    <div className='w-[230px] text-center flex flex-col gap-6'>
                        {/* CARDS */}
                        <div className='mx-auto w-[100px] h-[100px] bg-[#B3CDC6] p-4 rounded-md flex items-center justify-center'>
                            <img src={actionsIcon} alt="" />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Heading tag="h5" color="grey" weight="semibold">
                                Lográ acciones ecológicas
                            </Heading>
                            <p>Descubrí acciones del el día a día para reducir tu impacto.</p>
                        </div>
                    </div>

                    <div className='w-[230px] text-center flex flex-col gap-6'>
                        {/* CARDS */}
                        <div className='mx-auto bg-[#FAD3BC] w-[100px] h-[100px] p-4 rounded-md flex items-center justify-center'>
                            <img src={communityIcon} alt="" />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Heading tag="h5" color="grey" weight="semibold">
                                Unite a la comunidad
                            </Heading>
                            <p>Conectate con otras personas para mejorar el mundo.</p>
                        </div>
                    </div>
                </section>
            </section>
            <section
                className='flex my-32 justify-center mx-auto items-center gap-8 w-5/6'>
                <div
                    className='flex items-center justify-end flex-1'>
                    <div className='-mr-8'>
                        <img src={mockupProfileApp} alt="" className='w-full' />
                    </div>
                    <div>
                        <img src={mockupActionsApp} alt="" className='w-full' />
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                        <Heading tag="h2" color="darkGreen" weight="semibold">Haciendo posible un mundo mejor</Heading>
                        <p>From fun, social activities to ambitious carbon footprint reductions, take actions that are right for you and see the impact they have.</p>
                    </div>
                    <Button className='w-fit bg-[#005840] text-white'>
                        Registrarse
                    </Button>
                </div>
            </section>
            <Community />
            <Footer />
        </>
    )
}