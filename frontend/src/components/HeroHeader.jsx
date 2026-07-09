function HeroHeader({ title, subtitle }) {
    const name = localStorage.getItem("name") || "User";
    const role = localStorage.getItem("role") || "";

    return (
        <div className="hero-header">
            <div>
                <p className="hero-welcome">Welcome back, {name} </p>
                <h1>{title}</h1>
                <p className="hero-subtitle">{subtitle}</p>
            </div>


        </div>
    );
}

export default HeroHeader;