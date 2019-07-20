#!/usr/bin/env python
import pika
from read_order import pdfToOrder
import json 

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='readOrder')
channel.queue_declare(queue='results')

def callback(ch, method, properties, body):
    requestParams = json.loads(body.decode('utf-8'))
    scriptPath = requestParams[0]
    pdfPath = requestParams[1]
    index = requestParams[2]

    results = pdfToOrder.PDF_To_Order(scriptPath, pdfPath, index)

    # send a message back
    channel.basic_publish('','results',results)

# receive message and complete script
channel.basic_consume('readOrder',callback)

channel.start_consuming()

