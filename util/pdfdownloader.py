# import pdfkit
# pdfkit.from_url("http://localhost:3000/results?q=554fdbed17f72e782a5051cc",
# 	"out.pdf")

import sys
from PyQt4.QtCore import *
from PyQt4.QtGui import *
from PyQt4.QtWebKit import *
import time

url = sys.argv[1]
out = sys.argv[2]
 
app = QApplication(sys.argv)
 
web = QWebView()
web.load(QUrl(url))
#web.show()
 
printer = QPrinter()
printer.setPageSize(QPrinter.Letter)
printer.setOutputFormat(QPrinter.PdfFormat)
printer.setOutputFileName(out)
 
def convertIt():
	# print "waiting"
 #    time.sleep(10)
 #    print "printing..."
    web.print_(printer)
    print "Pdf generated"
    QApplication.exit()
 
QObject.connect(web, SIGNAL("loadFinished(bool)"), convertIt)
 
sys.exit(app.exec_())