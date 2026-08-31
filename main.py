# Initialize high and low values with the first sensor reading
sensor_value = accelerometer.get_x()
high_value = sensor_value
low_value = sensor_value

while True:
    # Read sensor value (e.g., accelerometer X-axis)
    sensor_value = accelerometer.get_x()

    # Update high and low values
    if sensor_value > high_value:
        high_value = sensor_value
    elif sensor_value < low_value:
        low_value = sensor_value

    # Print high and low values
    print("High:", high_value, "Low:", low_value)

    # Optional: Add a delay to control the sampling rate
    sleep(1000)  # Sleep for 1 second
