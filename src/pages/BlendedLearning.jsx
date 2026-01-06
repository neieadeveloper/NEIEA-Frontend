import React from 'react';
import PageTemplate from '../components/PageTemplate';

const BlendedLearning = () => {
  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "About", link: null },
        { name: "Our Working Model", link: null },
        { name: "Blended Learning Model", link: null }
      ]}
      title="NEIEA’S BLENDED LEARNING MODEL"
      subtitle=""
      description=""
      heroImage="/assets/images/BlendedLearningModel/1.png"
    >
      {/* Main Content with First Image on the Right */}
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <p
              style={{
                fontSize: "20px",
                lineHeight: "1.8",
                color: "#495057",
                marginBottom: "20px",
                textAlign: "justify"
              }}
            >
              NEIEA’s model is a symphony of disruption, harmonizing technology, pedagogy, and accessibility to orchestrate scalable change. Central to this is its hybrid blended learning framework, inspired by MIT’s Massive Open Online Courses (MOOCs) but reimagined for the underserved.
            </p>

            <p
              style={{
                fontSize: "20px",
                lineHeight: "1.8",
                color: "#495057",
                marginBottom: "20px",
                textAlign: "justify"
              }}
            >
              Qualified Mentor Teachers deliver live, interactive lessons via Google Workspace to IT-enabled classrooms equipped with LED screens, laptops, microphones, webcams, printers, and broadband. A single mentor can simultaneously reach multiple classrooms across towns or even countries, monitored by onsite coordinators who ensure engagement and discipline.
            </p>

            <p
              style={{
                fontSize: "20px",
                lineHeight: "1.8",
                color: "#495057",
                marginBottom: "20px",
                textAlign: "justify"
              }}
            >
              This scalability is revolutionary: One teacher, unbound by geography, educates hundreds, slashing costs to as low as $1 per month per subject or $50 annually for a full curriculum in English, Math, and Science.
            </p>

            <p
              style={{
                fontSize: "20px",
                lineHeight: "1.8",
                color: "#495057",
                marginBottom: "20px",
                textAlign: "justify"
              }}
            >
              For individual learners, virtual access via smartphones from 6 AM to 10 PM, seven days a week, shatters temporal barriers—ideal for child laborers, migrants, or those in remote areas. Contrast this with rigid school timetables; NEIEA’s flexibility invites philosophical musing: By adapting education to life rather than demanding life to adapt to it, NEIEA redefines pathways to increase and tap human potential.
            </p>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="/assets/images/BlendedLearningModel/2.png"
              alt="Blended Learning Model"
              className="img-fluid"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>

      {/* Second Image Below the Content */}
      {/* <div className="row justify-content-center mt-4">
        <div className="col-lg-8 text-center">
          <img
            src="/assets/images/BlendedLearningModel/1.png"
            alt="Implementation Process"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
          />
        </div>
      </div> */}
    </PageTemplate>
  );
};

export default BlendedLearning;
