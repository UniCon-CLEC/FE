import { BaseItem, ItemProps } from "./BaseItem"

export const CrewSmallItem = ({ className, ref }: ItemProps) => {
    // fetch

    return (
        <div className={`h-fit relative ${className}`} ref={ref}>
            <BaseItem lecturer="강사명" title="강의제목" noScrap/>
            <div className="text-(--subtext) text-xs text-center mt-1">
                12회차 진행 중
            </div>
        </div>
    )
}