import { ICompany } from "../../types/globalTypes";
import moment from "moment";
import "./CompaniesGrid.scss";

interface ICompaniesGridProps {
  data: ICompany[];
}

const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
  return (
    <div className="companies-grid-container">
      <div className="companies-grid-card">
        <table className="companies-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Size</th>
              <th>Creation Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td className="company-name">{company.name}</td>
                <td>
                  <span className={`badge size-${company.size.toLowerCase()}`}>
                    {company.size}
                  </span>
                </td>
                <td>{moment(company.createdAt).format("YYYY-MM-DD")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompaniesGrid;
