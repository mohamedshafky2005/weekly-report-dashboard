function StatusBadge({ status }) {
    if (status === "SUBMITTED") {
        return <span className="status-badge status-submitted">Submitted</span>;
    }

    if (status === "DRAFT") {
        return <span className="status-badge status-draft">Draft</span>;
    }

    return <span className="status-badge status-late">Late</span>;
}

export default StatusBadge;