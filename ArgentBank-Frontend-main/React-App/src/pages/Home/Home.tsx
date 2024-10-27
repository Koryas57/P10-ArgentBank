import React from 'react';
import { Navigation } from '../../components/Navigation/Navigation';
import { Footer } from '../../components/Footer/Footer';
import { Feature } from '../../components/Feature/Feature';
import chatIcon from '../../assets/images/icon-chat.png';
import moneyIcon from '../../assets/images/icon-money.png';
import securityIcon from '../../assets/images/icon-security.png';
/** Page d'accueil de l'application. */


export const Home: React.FC = () => {

    
    return (
        <>
            <Navigation />
            <main>
                <div className="hero">
                    <section className="hero-content">
                        <h2 className="sr-only">Promoted Content</h2>
                        <p className="subtitle">No fees.</p>
                        <p className="subtitle">No minimum deposit.</p>
                        <p className="subtitle">High interest rates.</p>
                        <p className="text">Open a savings account with Argent Bank today!</p>
                    </section>
                </div>
                <section className="features">
                    <Feature icon={chatIcon} title="You are our #1 priority" description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes." />
                    <Feature icon={moneyIcon} title="More savings means higher rates" description="The more you save with us, the higher your interest rate will be!" />
                    <Feature icon={securityIcon} title="Security you can trust" description="We use top of the line encryption to make sure your data and money is always safe." />
                </section>
            </main>
            <Footer />
        </>
    );
}