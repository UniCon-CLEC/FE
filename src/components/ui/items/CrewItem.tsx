import { BaseItem, ItemProps } from "./BaseItem"

export const CrewSmallItem = ({ course, className, ref }: ItemProps) => {
    // fetch

    return (
        <div className={`h-fit relative ${className}`} ref={ref}>
            <BaseItem course={course} noScrap/>
            <div className="text-(--subtext) text-xs text-center mt-1">
                12회차 진행 중
            </div>
        </div>
    )
}