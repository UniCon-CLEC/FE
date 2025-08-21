export const RequestNotice = ({ keyword }: { keyword: "트랙" | "크루" }) => {
    return (
        <section className="h-64 mt-25 ml-2">
            <h2 className="font-bold text-xl mb-2">원하는 {keyword}{keyword === "트랙" ? "이" : "가"} 없으신가요?</h2>
            <p className="">나에게 필요한 {keyword}{keyword === "트랙" ? "을" : "를"} 직접 신청해보세요!<br/>당신의 배움, 우리가 펀딩합니다.</p>
        </section>
    )
}