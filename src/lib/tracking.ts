type TrackingPayload = Record<string, string | number | boolean | undefined>;

export function track(_eventName: string, _payload: TrackingPayload = {}): void {
  // Intentionally no-op. Static tools do not send analytics or user input anywhere.
}
