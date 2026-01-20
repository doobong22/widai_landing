import React, { useEffect, useState, useRef, useMemo } from 'react';

import routes from "@/libs/routes";
import images from '@/libs/images';

import { useUser, usePopup, useLoading } from "@/store";

import landingVideo from '@/assets/img/landing_video.mp4';

export default function Home() {
    const { startLoading, endLoading } = useLoading();
    const { login, logout, mbData } = useUser();

    const signUpUri = "http://beta.widai.art/signUp"
    const signInUri = "http://beta.widai.art/login"
    const uriTerms = "http://beta.widai.art/terms?type=terms&signUp=true"
    const uriPrivacy = "http://beta.widai.art/terms?type=privacy&signUp=true"

    useEffect(() => {

    }, []);

    return (
        <div className='landing_page_container'>
            <div className="landing_page_content">
                <img src={images.landing_top_bar} className='landing_top_bar' />
                <img src={images.landing_logo} className='landing_logo' />

                <video
                    className='landing_video'
                    src={landingVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                />

                <div className='landing_btn_box'>
                    <button
                        className='landing_btn'
                        type="button"
                        onClick={() => {
                            window.open(signUpUri);
                        }}
                    >
                        Sign Up
                    </button>

                    <button
                        className='landing_btn'
                        type="button"
                        onClick={() => {
                            window.open(signInUri);
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </div>

            <div className='footer'>
                <div className='text_box'>
                    <div className='title'>
                        <img src={images.frame} />
                        About
                    </div>

                    <div className='comment'>
                        WIDAI is a generative AI platform that merges advanced technology with artistic imagination. <br />
                        By unifying diverse AI models into one seamless ecosystem, WIDAI empowers creators to explore, <br />
                        design, and express without boundaries.
                    </div>
                </div>

                <div className='line'></div>

                <div className='text_box'>
                    <div className='title'>
                        <img src={images.mail} />
                        Contact
                    </div>

                    <div className='comment sub'>
                        <div className='text title'>
                            For support
                        </div>

                        <div className='text email'>
                            <p>cs@easywith.com</p>
                            <p>privacy@easywith.com</p>
                        </div>
                    </div>
                </div>

                <div className='terms_box'>
                    <p
                        className='text'
                        onClick={() => {
                            window.open(uriTerms);
                        }}
                    >
                        Terms of Service
                    </p>

                    <div className="line"></div>

                    <p
                        className='text'
                        onClick={() => {
                            window.open(uriPrivacy);
                        }}
                    >
                        Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}