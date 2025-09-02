import type { Survey } from "@/data/survey";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";

export type SurveyType = 'TRACK_TOPIC' | 'CREW_TOPIC' | 'FUNDING_TOPIC';

const fetchSurveyData = async (type: SurveyType): Promise<Survey[]> => {
    const res = await request(`/surveys/${type}-topic`);
    if (!res.ok) throw new Error('failed to fetch survey data');
    return res.json();
}

export const useSurveyData = (type: SurveyType) => {
    return useQuery({
        queryKey: [ 'survey', { type } ],
        queryFn: async () => await fetchSurveyData(type),
        staleTime: 1000 * 60 * 1 // 1 min
    });
}