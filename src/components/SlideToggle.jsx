import { useRef, useEffect } from "react";

export default function SlideToggle({ isOpen, duration = 300, children }) {
    const ref = useRef(null);
    const timers = useRef([]);
    const initialized = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // 클린업 도우미
        const clearTimers = () => {
            timers.current.forEach((t) => clearTimeout(t));
            timers.current = [];
        };

        // 첫 마운트: transition 적용 안 하고 초기 상태만 세팅
        if (!initialized.current) {
            if (isOpen) {
                el.style.display = "block";
                el.style.height = "auto";
                el.style.overflow = "visible";
            } else {
                el.style.display = "none";
                el.style.height = "0px";
                el.style.overflow = "hidden";
            }
            // 이제부터는 상태 변경 시 애니메이션 로직을 사용
            initialized.current = true;
            return () => {
                clearTimers();
            };
        }

        // 이후 업데이트(마운트 이후)
        clearTimers();
        el.style.transition = `height ${duration}ms ease`;
        // 항상 애니메이션 중에는 overflow hidden (안정성)
        if (isOpen) {
            // 열기
            el.style.display = "block";
            el.style.overflow = "hidden";

            // 시작 높이(현재) -> 목표 높이
            // 보통 현재는 0px
            const startHeight = el.offsetHeight;
            const endHeight = el.scrollHeight;

            // 안전하게 시작값 세팅
            el.style.height = startHeight + "px";

            // 다음 animation frame에서 목표값으로 변경 (트랜지션 동작)
            requestAnimationFrame(() => {
                el.style.height = endHeight + "px";
            });

            // 애니메이션 끝난 뒤 auto로 바꿔 내부 변화에 대응
            const t = setTimeout(() => {
                el.style.height = "auto";
                el.style.overflow = "visible";
            }, duration);
            timers.current.push(t);
        } else {
            // 닫기
            // 드롭다운 등으로 인해 scrollHeight가 순간 커져 있을 수 있으니
            // overflow hidden 먼저 적용하고, 다음 frame에서 정확한 scrollHeight로 측정
            el.style.overflow = "hidden";

            requestAnimationFrame(() => {
                const startHeight = el.scrollHeight;
                el.style.height = startHeight + "px";

                // 강제 리플로우(안전)
                void el.offsetHeight;

                // 트랜지션으로 0으로 줄이기
                el.style.height = "0px";

                const t = setTimeout(() => {
                    el.style.display = "none";
                }, duration);
                timers.current.push(t);
            });
        }

        return () => {
            clearTimers();
        };
    }, [isOpen, duration]);

    return (
        <div ref={ref}>
            {children}
        </div>
    );
}