function Footer() {
    return (
        <footer
            style={{
                width: "100%",
                maxWidth: "1700px",
                margin: "60px auto 0",
                padding: "22px 30px",   // Reduced from 40px
                borderRadius: "20px",
                background: "linear-gradient(135deg, #0f172a, #1e40af, #2563eb)",
                color: "white",
                textAlign: "center",
                boxShadow: "0 15px 40px rgba(37,99,235,.25)",
            }}
        >
            <h2
                style={{
                    margin: "0 0 12px",
                    color: "white",
                    fontSize: "30px",
                    fontWeight: "800",
                }}
            >
                Weekly Report Dashboard
            </h2>

            <p
                style={{
                    margin: "0 0 20px",
                    color: "#dbeafe",
                    fontSize: "17px",
                }}
            >
                Full-Stack Software Engineering Internship Assignment
            </p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "35px",
                    flexWrap: "wrap",
                    fontWeight: "600",
                }}
            >
                <span>Developed by Mohamed Shafky</span>
                <span>© 2026</span>
            </div>
        </footer>
    );
}

export default Footer;