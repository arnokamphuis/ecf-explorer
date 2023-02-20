import { Phase } from "@/types/competency";

type CompetencyDescriptionProps = {
    lvl: number;
    comp: string
  };

  type ApiReturn = {
    description: string;
    phase: Phase;
    activity: string;
}
  async function getCompetency (lvl: number, comp: string): Promise<ApiReturn>{
    const res = await fetch(`/api/competencies/${comp}?level=${lvl}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

    return res.json()
  }
  
  export default async function CompetencyDescription({ comp, lvl }: CompetencyDescriptionProps) {
    const competency = await getCompetency(lvl, comp)
  
    return (
      <div>
        <p className="ml-4 font-bold">
          {comp} <span className="text-sx">({competency.phase})</span>:
        </p>
        <p className="ml-8 text-sx">{competency.activity} </p>
      </div>
    );
  }