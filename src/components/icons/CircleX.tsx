export default function CircleX(props: any) {
    return (
        <svg width={props.size} height={props.size} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}