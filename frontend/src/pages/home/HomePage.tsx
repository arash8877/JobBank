import "./home.scss";

const bannerImg = "https://images.unsplash.com/photo-1549923746-b7f3a7e3c35d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const companiesImg = "https://images.unsplash.com/photo-1610374792793-f016b77ca51a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const jobsImg = "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const applicantsImg = "https://images.unsplash.com/photo-1698047682091-782b1e5c6536?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const HomePage = () => {
  return (
    <div className="home content">
      <section className="banner">
        <img src={bannerImg} alt="Team working" />
        <div className="banner-overlay">
          <h1>Welcome to JobBank</h1>
          <p>Connecting talent with opportunities</p>
        </div>
      </section>

      <section className="highlights">
        <div className="card">
          <img src={companiesImg} alt="Companies" />
          <h2>Top Companies</h2>
          <p>Discover leading companies and their work culture</p>
        </div>
        <div className="card">
          <img src={jobsImg} alt="Jobs" />
          <h2>Exciting Jobs</h2>
          <p>Browse hundreds of opportunities to grow your career</p>
        </div>
        <div className="card">
          <img src={applicantsImg} alt="Applicants" />
          <h2>Talented People</h2>
          <p>Meet skilled professionals from diverse backgrounds</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
