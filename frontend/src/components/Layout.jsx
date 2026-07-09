import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="page-container">
                {children}
                <Footer />
            </div>
        </>
    );
}

export default Layout;